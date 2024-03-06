package com.notnulliwant.medit.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.notnulliwant.medit.entity.Cxrs;
import com.notnulliwant.medit.entity.Deeps;
import com.notnulliwant.medit.entity.Diagnosis;
import com.notnulliwant.medit.entity.PagingDiagAt;
import com.notnulliwant.medit.repository.CxrsRepository;
import com.notnulliwant.medit.repository.DeepsRepository;
import com.notnulliwant.medit.repository.DiagnosisRepository;
import com.notnulliwant.medit.service.DiagnosisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Component
public class RestDiagnosis_Controller {

	@Autowired
	private DiagnosisRepository Diagrepo;
	
	@Autowired
	private CxrsRepository cxrsRepo;
	
	@Autowired
	private DeepsRepository deepsRepo;
	
	@Autowired
	private DiagnosisService diagnosisService;

	//진단 날짜 띄워주는 컨트롤러
	@ResponseBody
	@RequestMapping("/ShowPatientAt")
	public List<Diagnosis> ShowPatientAt(Integer ptntId) {

		List<Diagnosis> diag = Diagrepo.findAllByPtntId(ptntId);

		return diag;
	}
	
	//의사소견 띄워주는 컨트롤러
	@ResponseBody
	@RequestMapping("/ShowDiagOpinion")
	public Diagnosis showDiagOpinion(Integer diagSeq) {

		Diagnosis docOpinion = Diagrepo.findAllBydiagSeq(diagSeq);
		return docOpinion;
	}

	//의사소견 DB저장해주는 컨트롤러
	@ResponseBody
	@RequestMapping("/saveOpinion")
	public String updateOpinion(Integer saveSeq, String saveOpinion) {

		Integer diagSeq = saveSeq;
		String doctorOpinion = saveOpinion;

		// DIAG_SEQ 값을 기준으로 DOCTOR_OPINION만 변경
		Diagrepo.updateDoctorOpinionByDiagSeq(diagSeq, doctorOpinion);

		return "";
	}
	
	// 진단 날짜 페이징
	@GetMapping("/diagAtPaging") 
	public PagingDiagAt paging_AT(@PageableDefault(page = 1) Pageable pageable, Integer ptntId) { 
			
		Page<Diagnosis> diaList = diagnosisService.Atpaging(pageable, ptntId);
			
		List<Diagnosis> diag = diaList.getContent();
			
		PagingDiagAt pagingdiagat = new PagingDiagAt();
		  
		int blockLimit = 4; // 페이지 개수 조정 
		int startPage = (((int) Math.ceil(((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1; 
		int endPage = Math.min((startPage + blockLimit - 1), diaList.getTotalPages());
		  
		pagingdiagat.setDiagnosis(diag);
		pagingdiagat.setFirst(diaList.isFirst());
		pagingdiagat.setLast(diaList.isLast());
		pagingdiagat.setNumber(diaList.getNumber());
		pagingdiagat.setTotalPage(diaList.getTotalPages());
		pagingdiagat.setStartPage(startPage); 	
		pagingdiagat.setEndPage(endPage);
		  
		return pagingdiagat; 
	}
	
	// 진단 디테일 출력
	@RequestMapping("showDiagDetail")
	public ArrayList<String> showDiagDetail(Integer diagSeq) {

	    Diagnosis diag = new Diagnosis();
	    diag.setDiagSeq(diagSeq);

	    List<Cxrs> cxrsList = cxrsRepo.findByDiagSeqOrderByCxrSeqAsc(diag);

	    Cxrs deepCxr = new Cxrs();

	    ArrayList<String> values = new ArrayList<>(); // 이미지 주소값 2개(index: 0, 1), 나머지는 결과 값 arrayList
	    
	    for (int i = 0; i < cxrsList.size(); i++) {
	        Cxrs cxrs = cxrsList.get(i);
	        values.add(cxrs.getCxrRealname());
	        
	        if(i == 1) {
	        	deepCxr.setCxrSeq(cxrs.getCxrSeq());
	        }
	    }

	    // 딥 러닝 결과 추출
	    Deeps deeps = deepsRepo.findByCxrSeq(deepCxr);
	    System.out.println(deeps + "***");
	    
	    String deepResult = deeps.getDeepResult();
	    
	    deepResult = deepResult.replace("\"", "").replace("[", "").replace("]", "");
	    
	    String[] resultString = deepResult.split(",");
	    
	    for(String text : resultString) {
	    	String[] parts =  text.trim().split(":");
	    	
	    	if(parts.length == 2) {
	    		values.add(parts[1].trim());
	    	}
	    }
	    
	    /* values
	    	0 : 원본
	    	1 : 딥러닝 사본
	    	---------------
	    	2 : 무기폐
	    	3 : 폐 경화
	    	4 : 침윤음영
	    	5 : 기흉
	    	6 : 폐 부종
	    	7 : 폐 기종
	    	8 : 폐 섬유증
	    	9 : 흉수
	    	10 : 폐렴
	    	11 : 흉막비후
	    	12 : 폐 결절
	    	13 : 폐 종괴
	    	14 : 폐 탈장
	    	--------------
	    	15 : 진단 결과 텍스트
	    */
	    Double highestValue = 0.0;
	    int highestIdx = 0;
	    String resultText = "";
	    String stampText = "";
	    
	    for(int i = 2; i < values.size(); i++) {
	    	Double value = Double.parseDouble(values.get(i));
	    	if(value > highestValue) {
	    		highestValue = value;
	    		highestIdx = i;
	    		
	    		if(i == 2) {
	    			if(highestValue > 45) {
	    				resultText = "폐는 정상적으로 풍선과 같이 공기를 품고 팽창되어 있어야 하는 장기입니다. 어떠한 이유에 의해서 폐의 일부가 팽창된 상태를 유지하지 못하고 부피가 줄어드는 '무기폐'로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "무기폐";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 무기폐이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 3) {
	    			if(highestValue > 45) {
	    				resultText = "액체나 세포 등이 폐포의 공기를 대체하여 폐가 단단하게 된 상태로써 폐 음영이 비교적 균일하게 증가하며 폐 용적의 변화가 거의없는 '폐 경화'로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "폐 경화";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 폐 경화이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 4) {
	    			if(highestValue > 45) {
	    				resultText = "조직이나 세포에 정상이 아닌 물질이나 비정상적으로 과다한 물질이 축적되는, 즉 이상세포 성분이 증가되는 '침윤음영'으로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "침윤음영";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 침윤음영이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 5) {
	    			if(highestValue > 45) {
	    				resultText = "폐에 구멍이 생겨 공기가 새고, 이로 인해 늑막강 내에 공기나 가스가 고이게 되는 '기흉'으로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "기흉";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 기흉이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 6) {
	    			if(highestValue > 45) {
	    				resultText = "혈관 밖의 폐조직인 폐간질 및 폐포에 비정상적으로 액체가 고이는 '폐 부종'으로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "폐 부종";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 폐 부종이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 7) {
	    			if(highestValue > 45) {
	    				resultText = "기관지나 폐에 염증이 생기고 이로 인해 숨을 쉴 때 폐 조직이 늘어나는 것을 조절하는 섬유가 파괴된 상태로, 공기의 흐름이 막히는 '폐 기종'으로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "폐 기종";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 폐 기종이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 8) {
	    			if(highestValue > 45) {
	    				resultText = "폐 조직이 굳어서 심각한 호흡 장애를 일으키는 '폐 섬유증'으로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다. 섬유화가 진행된 폐조직을 복구할 방법은 아쉽게도 없습니다.";
	    				stampText = "폐 섬유증";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 폐 섬유증이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 9) {
	    			if(highestValue > 45) {
	    				resultText = "폐의 흉막에서 체액 성분이 스며나오는 삼출 증상이 나타나는 '흉수'로 판단되며 흉막에서 흡수되는 체액보다 생성되는 체액이 많아질 때 발생합니다. 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "흉수";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 흉수이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 10) {
	    			if(highestValue > 45) {
	    				resultText = "세균이나 바이러스, 곰팡이 등의 미생물로 인한 감염으로 발생하는 '폐렴'으로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "폐렴";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 폐렴이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 11) {
	    			if(highestValue > 45) {
	    				resultText = "흉막이 딱딱하게 굳어 두꺼워지는 '흉막비후'로 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "흉막비후";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 흉막비후이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 12) {
	    			if(highestValue > 45) {
	    				resultText = "폐 내부에 생긴 지름 3cm 미만의 작은 구상 병변인 '폐 결절'로 판단되며 한 개만 있는 경우 고립성 폐결절, 여러 개가 있는 경우 다발성 폐결절 단순입니다. 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "폐 결절";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 폐 결절이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 13) {
	    			if(highestValue > 45) {
	    				resultText = "폐 종괴는 폐 결절과 구분하는 명확한 기준이 없습니다. 현재 CXR로 보아 지름이 3cm보다 크므로 '폐 종괴'라고 판단되며, 확률값은 " + highestValue + "%입니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "폐 종괴";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 폐 종괴이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    				stampText = "정상";
	    			}
	    		}
	    		if(i == 14) {
	    			if(highestValue > 45) {
	    				resultText = "폐가 흉벽 밖으로 돌출되는 '폐 탈장'으로 판단되며, 확률값은 " + highestValue + "%입니다. 천식과 같은 폐 질환에서 잦은 기침은 흉강 내압을 증가시키고 폐를 탈장시킬 수 있습니다. Medit은 임계값을 45%을 기준으로하고 있습니다.";
	    				stampText = "폐 탈장";
	    			} else {
	    				resultText = "임계값 45%를 기준으로 확률값이 임계값 이하라면 해당 질병일 가능성이 낮습니다. 현 CXR을 분석한 결과, 가장 높은 확률값을 가진 질환이 폐 탈장이지만 " + highestValue + " %이므로 '정상'이라고 판단됩니다.";
	    			}
	    		}
	    	}
	    }
	    values.add(resultText);
	    values.add(stampText);
	    return values;
	}	
	 	
}
